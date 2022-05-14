// populate the application with mock tasks
export const taskTypes = {list: 'list', text: 'text'};
const mock1: string = 'disabled selected';
const mock2: string = 'not selected';
const loremIpsum: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat convallis lobortis non aliquam lorem mi dolor. Commodo interdum nibh convallis.';

// date variables
let nowTimestamp: number = Date.now();
export const minutesMultiplier: number = 60000;

export const preloadedTasks = [
  /*
  type: text or list (string)
  title: (string) - max 256 characters
  description: for a text task - max?
  complete: if type == list, which list items are complete [string array]
  incomplete: if type == list, which list items are incomplete [string array]
  reminder: datetime number
  pinned: true/false (boolean)
  edited: datetime number
  created: datetime number
  trashed: true/false (boolean)
  done: true/false (boolean)
  */
  // pinned - check pinned flag
  { type: taskTypes.list, title: 'Task List', 
  description: '', 
  complete: [mock1, mock1, mock1, mock1, mock1, mock1, mock1, mock1], incomplete: [mock2], 
  reminder: nowTimestamp + (5 * minutesMultiplier), pinned: true, edited: nowTimestamp, created: nowTimestamp, trashed: false, done: false },

  { type: taskTypes.text, title: 'Task Title', description: loremIpsum, 
  complete: [], incomplete: [], 
  reminder: nowTimestamp  - 80000000, pinned: true, edited: nowTimestamp + (1 * minutesMultiplier), created: nowTimestamp+ (1 * minutesMultiplier), trashed: false, done: true },

  { type: taskTypes.list, title: 'Title 3', description: '', 
  complete: [mock1, mock1, mock1, mock1, mock1], incomplete: [], 
  reminder: nowTimestamp - (10 * minutesMultiplier), pinned: true, edited: nowTimestamp - (15 * minutesMultiplier), created: nowTimestamp - (15 * minutesMultiplier), trashed: false, done: false },

  { type: taskTypes.list, title: 'Tasks', description: '', 
  complete: [mock1, mock1, mock1, mock1], incomplete: [mock1, mock1, mock1, mock1], 
  reminder: 0, pinned: true, edited: nowTimestamp - (15 * minutesMultiplier), created: nowTimestamp - (15 * minutesMultiplier), trashed: false, done: false },
  
  // others - check pinned flag
  { type: taskTypes.list, title: '', description: '', 
  complete: [mock1, mock1, mock1, mock1], incomplete: [mock1, mock1, mock1, mock1], 
  reminder: nowTimestamp + 80000000, pinned: false, edited: nowTimestamp - (15 * minutesMultiplier), created: nowTimestamp - (15 * minutesMultiplier), trashed: false, done: false },

  { type: taskTypes.text, title: 'Task Title', description: loremIpsum, 
  complete: [], incomplete: [], 
  reminder: nowTimestamp + (15 * minutesMultiplier), pinned: false, edited: nowTimestamp + (2 * minutesMultiplier), created: nowTimestamp+ (2 * minutesMultiplier), trashed: false, done: false },

  { type: taskTypes.list, title: 'Tasks', 
  description: '', 
  complete: [], incomplete: [mock2, mock1, mock1, mock1, mock1], 
  reminder: nowTimestamp + (20 * minutesMultiplier), pinned: false, edited: nowTimestamp + (3 * minutesMultiplier), created: nowTimestamp + (3 * minutesMultiplier), trashed: false, done: false },

  { type: taskTypes.text, title: 'Subtring 0 - 10', description: loremIpsum.substring(0, 50), 
  complete: [], incomplete: [], 
  reminder: 0, pinned: false, edited: nowTimestamp + (4 * minutesMultiplier), created: nowTimestamp + (4 * minutesMultiplier), trashed: false, done: false },

  // trash - check trashed flag
  { type: taskTypes.list, title: 'Task List', 
  description: '', 
  complete: [mock1, mock1, mock1, mock1, mock1, mock1, mock1, mock1], incomplete: [mock2], 
  reminder: nowTimestamp + (5 * minutesMultiplier), pinned: true, edited: nowTimestamp - (20 * minutesMultiplier), created: nowTimestamp - (20 * minutesMultiplier), trashed: true, done: false },

  { type: taskTypes.list, title: 'Tasks', description: '', 
  complete: [mock1, mock1, mock1, mock1], incomplete: [mock1, mock1, mock1, mock1], 
  reminder: 0, pinned: true, edited: nowTimestamp - (25 * minutesMultiplier), created: nowTimestamp - (25 * minutesMultiplier), trashed: true, done: false },

  { type: taskTypes.list, title: '', description: '', 
  complete: [mock1, mock1, mock1, mock1], incomplete: [mock1, mock1, mock1, mock1], 
  reminder: 0, pinned: false, edited: nowTimestamp - (35 * minutesMultiplier), created: nowTimestamp - (35 * minutesMultiplier), trashed: true, done: false },
]

// modal toggle states
export const modalToggleStates = {create: 'create', edit: 'edit', view: 'view', close: 'close'};

export const modalTypes = {reminder: 'reminder', task: 'task', all: 'all'};

export const locale = 'en-GB';

export const notificationTypes = {deleteReminder: 'delr', deleteTask: 'delt', restoreTask: 'rest', undo: 'undo', reminder: 'reminder'};
