import React, { useState } from 'react';
import { Task, Workspace } from '../types';
import {
  CheckSquare,
  Clock,
  Plus,
  User,
  CheckCircle2,
  Circle,
  AlertTriangle,
} from 'lucide-react';

interface TasksViewProps {
  tasks: Task[];
  workspace: Workspace;
  onToggleTask: (taskId: string) => void;
  onCreateTask: (newTask: Omit<Task, 'id' | 'workspaceId'>) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  workspace,
  onToggleTask,
  onCreateTask,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED'>('ALL');
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('MEDIUM');
  const [dueDate, setDueDate] = useState('Today, 18:00');

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'PENDING') return !t.completed;
    if (filter === 'COMPLETED') return t.completed;
    return true;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onCreateTask({
      title,
      priority,
      dueDate,
      completed: false,
      assignedToName: 'Alexandre Laurent',
    });

    setTitle('');
    setShowModal(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              MongoDB Collection: Task
            </span>
            <span className="text-xs text-slate-400">Workspace : {workspace.name}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <CheckSquare className="w-6 h-6 text-indigo-600" />
            <span>Gestion des Tâches & Planning</span>
          </h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle Tâche</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 text-xs">
        {(['ALL', 'PENDING', 'COMPLETED'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filter === f
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {f === 'ALL' ? 'Toutes' : f === 'PENDING' ? 'En cours' : 'Terminées'}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs divide-y divide-slate-100">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <button
                onClick={() => onToggleTask(task.id)}
                className="cursor-pointer text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300" />
                )}
              </button>
              <div>
                <span
                  className={`text-xs font-semibold text-slate-900 block ${
                    task.completed ? 'line-through text-slate-400' : ''
                  }`}
                >
                  {task.title}
                </span>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{task.dueDate}</span>
                  </div>
                  {task.relatedContactName && (
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>{task.relatedContactName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  task.priority === 'URGENT'
                    ? 'bg-rose-100 text-rose-700'
                    : task.priority === 'HIGH'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="p-12 text-center text-xs text-slate-400">
            Aucune tâche trouvée pour ce filtre.
          </div>
        )}
      </div>

      {/* Modal: Create Task */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Créer une tâche</h2>
            <p className="text-xs text-slate-500 mb-5">
              Liée aux rappels et notifications du CRM.
            </p>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Titre de la tâche *</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Rappeler le client pour signature"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Priorité</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Task['priority'])}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Échéance</label>
                  <input
                    type="text"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
