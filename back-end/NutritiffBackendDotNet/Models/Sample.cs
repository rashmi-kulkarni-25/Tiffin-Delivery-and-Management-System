using System;
using System.Collections.Generic;

namespace Nutritiff.Models;

public partial class Sample
{
    public int Id { get; set; }

    public byte[] Image { get; set; } = null!;
}
