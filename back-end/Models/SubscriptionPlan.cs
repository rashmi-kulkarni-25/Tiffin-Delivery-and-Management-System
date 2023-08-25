using System;
using System.Collections.Generic;

namespace Nutritiff.Models;

public partial class SubscriptionPlan
{
    public int PlanId { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public float Price { get; set; }

    public int NoOfMeals { get; set; }

    public virtual ICollection<SubscriptionPurchase> SubscriptionPurchases { get; set; } = new List<SubscriptionPurchase>();
}
