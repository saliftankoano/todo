import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listToDos = query({
  handler: async (ctx) => {
    return await ctx.db.query("todos").collect();
  },
});

export const createToDo = mutation({
  args: {
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("todos", {
      title: args.title,
      description: args.description,
      completed: false,
    });
  },
});

export const updateToDo = mutation({
  args: {
    id: v.id("todos"),
    completed: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      completed: args.completed,
    });
  },
});

export const deleteToDo = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
