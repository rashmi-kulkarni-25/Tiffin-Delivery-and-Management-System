using System;
using System.Collections.Generic;

namespace Nutritiff.Models;

public partial class SubscriptionPurchase
{
    public int PurchaseId { get; set; }

    public int PlanId { get; set; }

    public int CustomerId { get; set; }

    public string? Status { get; set; }

    public string? TransactionId { get; set; }

    public DateTime Timestamp { get; set; }

    public virtual SubscriptionPlan? Plan { get; set; }
}
