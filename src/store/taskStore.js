import { create } from "zustand";
import localforage from "localforage";
import { v4 as uuid } from "uuid";
import { formatISO } from "date-fns";

const storageKey = "task-manager-store";

// Configure IndexedDB storage
localforage.config({
  name: "TaskManager",
  storeName: "task_data",
});

export const useTaskStore = create((set, get) => ({
  tasks: [],
  settings: {
    theme: "light",
    showCompleted: true,
    defaultView: "today",
  },

  // -----------------------------
  //   PERSISTENCE
  // -----------------------------
  loadFromStorage: async () => {
    const data = await localforage.getItem(storageKey);
    if (data) set(data);
  },

  saveToStorage: async () => {
    const state = get();
    await localforage.setItem(storageKey, {
      tasks: state.tasks,
      settings: state.settings,
    });
  },

  // -----------------------------
  //   TASK ACTIONS
  // -----------------------------
  addTask: (title, description = "", dueDate = null, priority = "medium") => {
    const newTask = {
      id: uuid(),
      title,
      description,
      dueDate,
      priority,
      completed: false,
      createdAt: formatISO(new Date()),
      updatedAt: formatISO(new Date()),
    };

    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));

    get().saveToStorage();
  },

  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, ...updates, updatedAt: formatISO(new Date()) } : t
      ),
    }));

    get().saveToStorage();
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }));

    get().saveToStorage();
  },

  toggleComplete: (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;

    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              updatedAt: formatISO(new Date()),
            }
          : t
      ),
    }));

    get().saveToStorage();
  },

  // -----------------------------
  //   FILTERING
  // -----------------------------
  getTasksForToday: () => {
    const today = new Date().toISOString().slice(0, 10);
    return get().tasks.filter(
      (t) => t.dueDate && t.dueDate.slice(0, 10) === today && !t.completed
    );
  },

  getTasksForWeek: () => {
    const now = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(now.getDate() + 7);

    return get().tasks.filter((t) => {
      if (!t.dueDate) return false;
      const due = new Date(t.dueDate);
      return due >= now && due <= weekFromNow && !t.completed;
    });
  },

  getUrgentTasks: () => {
    return get().tasks.filter((t) => t.priority === "urgent" && !t.completed);
  },

  searchTasks: (query) => {
    const lower = query.toLowerCase();
    return get().tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(lower) ||
        t.description.toLowerCase().includes(lower)
    );
  },
}));
