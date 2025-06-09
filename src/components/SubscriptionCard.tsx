import React from "react";
import { Subscription } from "../types";
import { Calendar, DollarSign, Edit3, Trash2 } from "lucide-react";

interface SubscriptionCardProps {
  subscription: Subscription;
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: number) => void;
}

const getCategoryColor = (category: string) => {
  const colors = {
    Entretenimiento: 'bg-red-100 text-red-800 border-red-200',
    Musica: 'bg-green-100 text-green-800 border-green-200',
    Diseño: 'bg-purple-100 text-purple-800 border-purple-200',
    Productividad: 'bg-blue-100 text-blue-800 border-blue-200',
    Gaming: 'bg-orange-100 text-orange-800 border-orange-200',
    Educacion: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    Otro: 'bg-gray-100 text-gray-800 border-gray-200',
  };
  return colors[category as keyof typeof colors] || colors.Otro;
};

const getStatusColor = (status: string) => {
  const colors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return colors[status as keyof typeof colors] || colors.active;
};

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isExpiringSoon = () => {
    const renewalDate = new Date(subscription.renewalDate);
    const today = new Date();
    const diffTime = renewalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {subscription.name}
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(
                subscription.category
              )}`}
            >
              {subscription.category}
            </span>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                subscription.status
              )}`}
            >
              {subscription.status}
            </span>
            {isExpiringSoon() && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                Expira pronto
              </span>
            )}
          </div>
          {subscription.description && (
            <p className="text-sm text-gray-600 mb-3">
              {subscription.description}
            </p>
          )}
        </div>
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(subscription)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(subscription.id!)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-green-600">
          <DollarSign className="h-4 w-4" />
          <span className="text-lg font-bold">${subscription.cost}</span>
          <span className="text-sm text-gray-500">/month</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">
            {formatDate(subscription.renewalDate)}
          </span>
        </div>
      </div>
    </div>
  );
};
