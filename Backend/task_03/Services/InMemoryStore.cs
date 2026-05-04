using DodoKds.Api.Models;

namespace DodoKds.Api.Services;

/// <summary>
/// Thread-safe in-memory store. Initialized once on startup; resets on service restart.
/// </summary>
public sealed class InMemoryStore
{
    private readonly List<Order> _orders;
    private readonly List<Station> _stations;
    private readonly object _lock = new();

    public InMemoryStore()
    {
        _stations = SeedStations();
        _orders = SeedOrders();
    }

    // ── Stations ────────────────────────────────────────────────────────────

    public IReadOnlyList<Station> GetStations()
    {
        lock (_lock) return _stations.ToList();
    }

    // ── Orders ───────────────────────────────────────────────────────────────

    public IReadOnlyList<Order> GetOrders() 
    {
        lock (_lock) return _orders.ToList();
    }

    public Order? GetOrder(string id)
    {
        lock (_lock) return _orders.FirstOrDefault(o => o.Id == id);
    }

    public Order? UpdateOrderStatus(string id, OrderStatus newStatus)
    {
        lock (_lock)
        {
            var idx = _orders.FindIndex(o => o.Id == id);
            if (idx < 0) return null;

            var updated = _orders[idx] with
            {
                Status = newStatus,
                UpdatedAt = DateTimeOffset.UtcNow
            };
            _orders[idx] = updated;
            return updated;
        }
    }

    /// <summary>Adds a new order (used by Swagger for testing polling).</summary>
    public Order AddOrder(Order order)
    {
        lock (_lock)
        {
            _orders.Add(order);
            return order;
        }
    }

    public bool DeleteOrder(string id)
    {
        lock (_lock)
        {
            var idx = _orders.FindIndex(o => o.Id == id);
            if (idx < 0) return false;
            _orders.RemoveAt(idx);
            return true;
        }
    }

    // ── Seed data ─────────────────────────────────────────────────────────

    private static List<Station> SeedStations() =>
    [
        new("station-pizza",    "Пицца",   StationType.Pizza),
        new("station-drinks",   "Напитки",  StationType.Drinks),
        new("station-desserts", "Десерты",  StationType.Desserts),
    ];

    private static List<Order> SeedOrders()
    {
        var now = DateTimeOffset.UtcNow;
        var rng = new Random(42);

        var templates = new[]
        {
            // Pizza orders
            (StationType.Pizza, new[] { new OrderItem("Пепперони 30см", 1), new OrderItem("Сырная корочка", 1) }),
            (StationType.Pizza, new[] { new OrderItem("Маргарита 25см", 2) }),
            (StationType.Pizza, new[] { new OrderItem("Барбекю 35см", 1), new OrderItem("Ранч 25см", 1) }),
            (StationType.Pizza, new[] { new OrderItem("4 сыра 30см", 1) }),
            (StationType.Pizza, new[] { new OrderItem("Гавайская 25см", 1), new OrderItem("Митбол 25см", 1) }),
            // Drinks orders
            (StationType.Drinks, new[] { new OrderItem("Кола 0.5л", 2), new OrderItem("Сок апельсин", 1) }),
            (StationType.Drinks, new[] { new OrderItem("Молочный коктейль", 1) }),
            (StationType.Drinks, new[] { new OrderItem("Лимонад клубника", 2) }),
            (StationType.Drinks, new[] { new OrderItem("Вода 0.5л", 3), new OrderItem("Кофе латте", 1) }),
            // Desserts orders
            (StationType.Desserts, new[] { new OrderItem("Додстер с нутеллой", 2) }),
            (StationType.Desserts, new[] { new OrderItem("Чизкейк Нью-Йорк", 1), new OrderItem("Тирамису", 1) }),
            (StationType.Desserts, new[] { new OrderItem("Шоколадный фондан", 2) }),
            (StationType.Desserts, new[] { new OrderItem("Мороженое ванильное", 3) }),
            // Mixed (multi-station real orders)
            (StationType.Pizza,    new[] { new OrderItem("Пепперони 35см", 1) }),
            (StationType.Drinks,   new[] { new OrderItem("Фреш апельсин", 2) }),
        };

        var statuses = new[] { OrderStatus.New, OrderStatus.New, OrderStatus.New, OrderStatus.InProgress, OrderStatus.InProgress, OrderStatus.Ready };

        return templates
            .Select((t, i) =>
            {
                var status = statuses[i % statuses.Length];
                var createdAt = now.AddMinutes(-rng.Next(1, 20));
                var updatedAt = status != OrderStatus.New
                    ? createdAt.AddMinutes(rng.Next(1, 5))
                    : (DateTimeOffset?)null;

                return new Order(
                    Id: $"order-{i + 1:D3}",
                    OrderNumber: $"#{1000 + i}",
                    Station: t.Item1,
                    Status: status,
                    Items: t.Item2,
                    CreatedAt: createdAt,
                    UpdatedAt: updatedAt
                );
            })
            .ToList();
    }
}
