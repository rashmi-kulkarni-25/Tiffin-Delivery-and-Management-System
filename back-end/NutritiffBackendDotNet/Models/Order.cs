using System;
using System.Collections.Generic;

namespace Nutritiff.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public int CustomerId { get; set; }

    public double TotalPrice { get; set; }

    public DateTime Timestamp { get; set; }

    public string? TransactionId { get; set; }

    public string? Status { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
