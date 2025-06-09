import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { SubscriptionModal } from '../components/SubscriptionModal';
import { useAuth } from '../context/AuthContext';
import { Subscription } from '../types';
import { api } from '../services/api';
import { Plus, Search, Filter, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import Swal from 'sweetalert2';
import { JSX } from 'react/jsx-runtime';

export const DashboardPage = (): JSX.Element => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['All', 'Entertainment', 'Music', 'Design', 'Productivity', 'Gaming', 'Education', 'Other'];

  useEffect(() => {
    loadSubscriptions();
  }, [user]);

  useEffect(() => {
    filterSubscriptions();
  }, [subscriptions, searchTerm, selectedCategory]);

  const loadSubscriptions = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const data = await api.getSubscriptions(user.id);
      setSubscriptions(data);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
      Swal.fire('Error', 'Failed to load subscriptions', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const filterSubscriptions = () => {
    let filtered = subscriptions;

    if (searchTerm) {
      filtered = filtered.filter(sub =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(sub => sub.category === selectedCategory);
    }

    setFilteredSubscriptions(filtered);
  };

  const handleSaveSubscription = async (subscriptionData: Omit<Subscription, 'id'>) => {
    try {
      if (editingSubscription) {
        await api.updateSubscription(editingSubscription.id!, {
          ...subscriptionData,
          id: editingSubscription.id,
        });
        Swal.fire('Success', 'Subscription updated successfully!', 'success');
      } else {
        await api.createSubscription(subscriptionData);
        Swal.fire('Success', 'Subscription added successfully!', 'success');
      }
      loadSubscriptions();
      setEditingSubscription(undefined);
    } catch (error) {
      console.error('Error saving subscription:', error);
      Swal.fire('Error', 'Failed to save subscription', 'error');
    }
  };

  const handleEditSubscription = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setIsModalOpen(true);
  };

  const handleDeleteSubscription = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await api.deleteSubscription(id);
        loadSubscriptions();
        Swal.fire('Deleted!', 'Your subscription has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting subscription:', error);
        Swal.fire('Error', 'Failed to delete subscription', 'error');
      }
    }
  };

  const totalMonthlyCost = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((sum, sub) => sum + sub.cost, 0);

  const totalYearlyCost = totalMonthlyCost * 12;

  const upcomingRenewals = subscriptions.filter(sub => {
    const renewalDate = new Date(sub.renewalDate);
    const today = new Date();
    const diffTime = renewalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0 && sub.status === 'active';
  }).length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Monthly Cost</p>
                <p className="text-2xl font-bold">${totalMonthlyCost.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Yearly Cost</p>
                <p className="text-2xl font-bold">${totalYearlyCost.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Renewals Soon</p>
                <p className="text-2xl font-bold">{upcomingRenewals}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-200" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search subscriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                setEditingSubscription(undefined);
                setIsModalOpen(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-emerald-600 flex items-center space-x-2 transition-all duration-200 font-medium"
            >
              <Plus className="h-4 w-4" />
              <span>Add Subscription</span>
            </button>
          </div>
        </div>

        {/* Subscriptions Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredSubscriptions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No subscriptions found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedCategory !== 'All'
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first subscription.'}
            </p>
            {!searchTerm && selectedCategory === 'All' && (
              <button
                onClick={() => {
                  setEditingSubscription(undefined);
                  setIsModalOpen(true);
                }}
                className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-emerald-600 inline-flex items-center space-x-2 transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Add Your First Subscription</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onEdit={handleEditSubscription}
                onDelete={handleDeleteSubscription}
              />
            ))}
          </div>
        )}
      </div>

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSubscription(undefined);
        }}
        onSave={handleSaveSubscription}
        subscription={editingSubscription}
        userId={user?.id || 0}
      />
    </Layout>
  );
};