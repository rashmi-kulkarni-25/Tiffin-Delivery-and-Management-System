using System;
using System.Collections.Generic;

namespace Nutritiff.Models;

public partial class Cart
{
    public int CartId { get; set; }

    public int CustomerId { get; set; }

    public int TiffinId { get; set; }

    public int Quantity { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual Tiffin? Tiffin { get; set; }
}
