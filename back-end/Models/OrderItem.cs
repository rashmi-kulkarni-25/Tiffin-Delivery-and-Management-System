using System;
using System.Collections.Generic;

namespace Nutritiff.Models;

public partial class OrderItem
{
    public int OrderitemId { get; set; }

    public int OrderId { get; set; }

    public int TiffinId { get; set; }

    public int Quantity { get; set; }

    public double Price { get; set; }

    public virtual Order? Order { get; set; }

    public virtual Tiffin? Tiffin { get; set; }

}
