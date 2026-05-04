using DodoKds.Api.Models;
using DodoKds.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace DodoKds.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class OrdersController(InMemoryStore store) : ControllerBase
{
    /// <summary>Get all orders. Supports optional filtering by station and/or status.</summary>
    [HttpGet]
    [ProducesResponseType<IReadOnlyList<Order>>(StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<Order>> GetAll(
        [FromQuery] StationType? station = null,
        [FromQuery] OrderStatus? status = null)
    {
        var orders = store.GetOrders().AsEnumerable();

        if (station.HasValue)
            orders = orders.Where(o => o.Station == station.Value);

        if (status.HasValue)
            orders = orders.Where(o => o.Status == status.Value);

        return Ok(orders.OrderByDescending(o => o.CreatedAt).ToList());
    }

    /// <summary>Get a single order by ID.</summary>
    [HttpGet("{id}")]
    [ProducesResponseType<Order>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<Order> GetById(string id)
    {
        var order = store.GetOrder(id);
        return order is null ? NotFound() : Ok(order);
    }

    /// <summary>
    /// Update the status of an order.
    /// Allowed transitions: New → InProgress → Ready.
    /// </summary>
    [HttpPatch("{id}/status")]
    [ProducesResponseType<Order>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<Order> UpdateStatus(string id, [FromBody] UpdateOrderStatusRequest request)
    {
        var existing = store.GetOrder(id);
        if (existing is null) return NotFound();

        // Guard against invalid transitions
        var invalid =
            (existing.Status == OrderStatus.Ready) ||
            (existing.Status == OrderStatus.New && request.Status == OrderStatus.Ready) ||
            (existing.Status == OrderStatus.InProgress && request.Status == OrderStatus.New);

        if (invalid)
            return BadRequest(new { error = $"Cannot transition from {existing.Status} to {request.Status}." });

        var updated = store.UpdateOrderStatus(id, request.Status);
        return updated is null ? NotFound() : Ok(updated);
    }

    /// <summary>
    /// Add a new order manually (useful for testing polling from Swagger).
    /// </summary>
    [HttpPost]
    [ProducesResponseType<Order>(StatusCodes.Status201Created)]
    public ActionResult<Order> Create([FromBody] CreateOrderRequest request)
    {
        var order = new Order(
            Id: $"order-{Guid.NewGuid():N}",
            OrderNumber: $"#{new Random().Next(2000, 9999)}",
            Station: request.Station,
            Status: OrderStatus.New,
            Items: request.Items,
            CreatedAt: DateTimeOffset.UtcNow,
            UpdatedAt: null
        );

        store.AddOrder(order);
        return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
    }

    /// <summary>Delete an order by ID (for testing).</summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult Delete(string id)
    {
        var deleted = store.DeleteOrder(id);
        return deleted ? NoContent() : NotFound();
    }
}

public record CreateOrderRequest(
    StationType Station,
    IReadOnlyList<OrderItem> Items
);
