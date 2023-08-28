using System;
using System.Collections.Generic;

namespace Nutritiff.Models;

public partial class DeliveryPerson
{
    public int Pid { get; set; }

    public string Name { get; set; } = null!;

    public string MobNo { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Pincode { get; set; } = null!;

    public string LicenceNo { get; set; } = null!;
}
