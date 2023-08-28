using System;
using System.Collections.Generic;

namespace Nutritiff.Models;

public partial class Favorite
{
    public int FId { get; set; }

    public int CustomerId { get; set; }

    public int TiffinId { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual Tiffin? Tiffin { get; set; }
}
