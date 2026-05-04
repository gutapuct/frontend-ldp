namespace DodoKds.Api.Models;

public enum StationType
{
    Pizza,
    Drinks,
    Desserts
}

public enum OrderStatus
{
    New,
    InProgress,
    Ready
}

public record OrderItem(
    string Name,
    int Quantity
);

public record Station(
    string Id,
    string Name,
    StationType Type
);

public record Order(
    string Id,
    string OrderNumber,
    StationType Station,
    OrderStatus Status,
    IReadOnlyList<OrderItem> Items,
    DateTimeOffset CreatedAt,
    DateTimeOffset? UpdatedAt
);

public record UpdateOrderStatusRequest(OrderStatus Status);
