using System;
using System.Collections.Generic;

namespace Nutritiff.Models;

public partial class ApprovalRequest
{
    public int ReqId { get; set; }

    public int VendorId { get; set; }

    public string? Status { get; set; }

    public virtual Vendor? Vendor { get; set; }
}
