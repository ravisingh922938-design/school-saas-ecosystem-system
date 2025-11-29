import React, { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';

const ManagePlans = () => {
  const initialPlans = [
    {
      id: 1,
      name: "Basic Plan",
      price: 999,
      maxStudents: 500,
      features: ["Basic App Access", "50 GB Storage"],
    },
    {
      id: 2,
      name: "Standard Plan",
      price: 1999,
      maxStudents: 2000,
      features: ["All Basic Features", "Includes SMS", "100 GB Storage", "Priority Support"],
    },
    {
      id: 3,
      name: "Premium Plan",
      price: 2999,
      maxStudents: 5000,
      features: ["All Standard Features", "App Access", "Unlimited Storage", "24/7 Support", "Online Exam Module"],
    },
  ];

  const [plans, setPlans] = useState(initialPlans);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [newPlanName, setNewPlanName] = useState('');
  const [newPlanPrice, setNewPlanPrice] = useState('');
  const [newPlanMaxStudents, setNewPlanMaxStudents] = useState('');
  const [newPlanFeatures, setNewPlanFeatures] = useState(['']);

  const handleEditClick = (plan) => {
    setEditingPlanId(plan.id);
    setNewPlanName(plan.name);
    setNewPlanPrice(plan.price);
    setNewPlanMaxStudents(plan.maxStudents);
    setNewPlanFeatures(plan.features);
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...newPlanFeatures];
    updatedFeatures[index] = value;
    setNewPlanFeatures(updatedFeatures);
  };

  const addFeature = () => {
    setNewPlanFeatures([...newPlanFeatures, '']);
  };

  const removeFeature = (index) => {
    const updatedFeatures = newPlanFeatures.filter((_, i) => i !== index);
    setNewPlanFeatures(updatedFeatures);
  };

  const handleSaveChanges = (id) => {
    const updatedPlans = plans.map((plan) =>
      plan.id === id
        ? {
            ...plan,
            name: newPlanName,
            price: parseFloat(newPlanPrice),
            maxStudents: parseInt(newPlanMaxStudents),
            features: newPlanFeatures.filter(feature => feature.trim() !== ''),
          }
        : plan
    );
    setPlans(updatedPlans);
    setEditingPlanId(null);
    alert(`Plan ${newPlanName} saved successfully!`);
  };

  const handleCreateNewPlan = () => {
    const newId = Math.max(...plans.map(p => p.id)) + 1;
    const newPlan = {
      id: newId,
      name: "New Plan",
      price: 0,
      maxStudents: 0,
      features: [],
    };
    setPlans([...plans, newPlan]);
    handleEditClick(newPlan); // Immediately start editing the new plan
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 dark:text-gray-100">Manage Subscription Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
            {editingPlanId === plan.id ? (
              // Edit Mode
              <form className="space-y-4">
                <div>
                  <label htmlFor={`plan-name-${plan.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Plan Name</label>
                  <input
                    type="text"
                    id={`plan-name-${plan.id}`}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                    value={newPlanName}
                    onChange={(e) => setNewPlanName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor={`plan-price-${plan.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Price (₹)</label>
                  <input
                    type="number"
                    id={`plan-price-${plan.id}`}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                    value={newPlanPrice}
                    onChange={(e) => setNewPlanPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor={`max-students-${plan.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Max Students Allowed</label>
                  <input
                    type="number"
                    id={`max-students-${plan.id}`}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                    value={newPlanMaxStudents}
                    onChange={(e) => setNewPlanMaxStudents(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Features</label>
                  <div className="space-y-2">
                    {newPlanFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          className="block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                        />
                        <button type="button" onClick={() => removeFeature(index)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"><Trash2 size={18} /></button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addFeature} className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 dark:text-blue-400 dark:hover:text-blue-300">
                    <Plus size={16} /> Add Feature
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleSaveChanges(plan.id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mt-4 dark:bg-green-700 dark:hover:bg-green-600"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              // View Mode
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{plan.name}</h2>
                  <button onClick={() => handleEditClick(plan)} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"><Edit size={20} /></button>
                </div>
                <p className="text-3xl font-extrabold text-blue-600 mb-2 dark:text-blue-400">₹{plan.price}/month</p>
                <p className="text-sm text-gray-600 mb-4 dark:text-gray-300">Max Students: {plan.maxStudents}</p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 dark:text-gray-200">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {/* Create New Plan Card */}
        <div
          onClick={handleCreateNewPlan}
          className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-md border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition dark:bg-slate-800 dark:border-slate-600 dark:hover:bg-slate-700"
        >
          <Plus className="w-12 h-12 text-gray-400 mb-4 dark:text-gray-300" />
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-100">Create New Plan</p>
        </div>
      </div>
    </div>
  );
};

export default ManagePlans;
