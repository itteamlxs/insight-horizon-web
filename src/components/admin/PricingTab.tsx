
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Edit, Plus, Trash2, X } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted: boolean;
}

interface PricingTabProps {
  pricingPlans: PricingPlan[];
  setPricingPlans: React.Dispatch<React.SetStateAction<PricingPlan[]>>;
}

const PricingTab: React.FC<PricingTabProps> = ({
  pricingPlans,
  setPricingPlans
}) => {
  const [editingPlan, setEditingPlan] = React.useState<PricingPlan | null>(null);

  const savePricingPlans = () => {
    localStorage.setItem('pricingPlans', JSON.stringify(pricingPlans));
    alert('Pricing plans saved successfully!');
  };

  const handleEditPlan = (plan: PricingPlan) => {
    setEditingPlan({ ...plan });
  };

  const handleSavePlan = () => {
    if (editingPlan) {
      setPricingPlans(prev => 
        prev.map(plan => 
          plan.id === editingPlan.id ? editingPlan : plan
        )
      );
      setEditingPlan(null);
      savePricingPlans();
    }
  };

  const handlePlanFeatureChange = (index: number, value: string) => {
    if (editingPlan) {
      const newFeatures = [...editingPlan.features];
      newFeatures[index] = value;
      setEditingPlan({ ...editingPlan, features: newFeatures });
    }
  };

  const addPlanFeature = () => {
    if (editingPlan) {
      setEditingPlan({
        ...editingPlan,
        features: [...editingPlan.features, '']
      });
    }
  };

  const removePlanFeature = (index: number) => {
    if (editingPlan) {
      setEditingPlan({
        ...editingPlan,
        features: editingPlan.features.filter((_, i) => i !== index)
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Pricing Plans Management</CardTitle>
          <CardDescription className="dark:text-gray-300">Edit pricing plans and their features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className="dark:bg-gray-700 dark:border-gray-600">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg dark:text-white">{plan.name}</CardTitle>
                    <Button size="sm" onClick={() => handleEditPlan(plan)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription className="dark:text-gray-300">${plan.price}/month</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2 dark:text-gray-300">{plan.description}</p>
                  <div className="space-y-1">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="text-xs text-gray-600 dark:text-gray-400">
                        • {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Edit Plan Modal */}
          {editingPlan && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="dark:text-white">Edit Plan: {editingPlan.name}</CardTitle>
                    <Button size="sm" variant="ghost" onClick={() => setEditingPlan(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="dark:text-white">Plan Name</Label>
                    <Input
                      value={editingPlan.name}
                      onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label className="dark:text-white">Price</Label>
                    <Input
                      type="number"
                      value={editingPlan.price}
                      onChange={(e) => setEditingPlan({...editingPlan, price: parseInt(e.target.value)})}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label className="dark:text-white">Description</Label>
                    <Input
                      value={editingPlan.description}
                      onChange={(e) => setEditingPlan({...editingPlan, description: e.target.value})}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="dark:text-white">Features</Label>
                      <Button size="sm" onClick={addPlanFeature}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {editingPlan.features.map((feature: string, index: number) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => handlePlanFeatureChange(index, e.target.value)}
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removePlanFeature(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={editingPlan.highlighted}
                      onCheckedChange={(checked) => setEditingPlan({...editingPlan, highlighted: checked})}
                    />
                    <Label className="dark:text-white">Mark as Popular</Label>
                  </div>
                  <Button onClick={handleSavePlan} className="w-full">
                    Save Plan
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingTab;
