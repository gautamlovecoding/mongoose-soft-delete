# mongoose-soft-delete

A Mongoose plugin that adds soft delete functionality and active/inactive status to your Mongoose models, enabling efficient data management without permanently removing documents from the database.

## Features

- **Soft Delete**: Mark documents as deleted without removing them from the database.
- **Active/Inactive Status**: Easily manage the state of documents with active and inactive flags.
- **Flexible Querying**: Find non-deleted and active documents effortlessly.
- **Middleware Support**: Automatically filter out deleted and inactive documents in query operations.
- **Restore Functionality**: (Optional) Restore soft-deleted documents while managing their active state.

## Installation

To install the plugin, run:

```bash
npm install mongoose-soft-delete-plugin
```

## Usase
After installing the package, you can easily integrate it into your Mongoose schema by following these steps:

**Step 1:** Add the plugin to your schema.

First, define a Mongoose schema and apply the mongoose-soft-delete plugin to it:

```bash
const mongoose = require('mongoose');
const softDeletePlugin = require('mongoose-soft-delete');

// Define your schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

// Apply the soft delete plugin
userSchema.plugin(softDeletePlugin);

// Create the model
const User = mongoose.model('User', userSchema);

```
**Step 2:** Soft Delete a Document.
Once you’ve applied the plugin, you can soft delete a document by calling the softDelete method on a Mongoose model instance:

```bash
async function softDeleteUser(userId) {
  const user = await User.findById(userId);
  if (user) {
    await user.softDelete();
    console.log('User soft deleted:', user);
  }
}

```
**Step 3:**  Deactivate a Document.
To deactivate a document (mark it as inactive), use the deactivate method:

```bash
async function deactivateUser(userId) {
  const user = await User.findById(userId);
  if (user) {
    await user.deactivate();
    console.log('User deactivated:', user);
  }
}

```
**Step 4:** Activate a Document.

You can reactivate a previously deactivated document using the activate method:

```bash
async function activateUser(userId) {
  const user = await User.findById(userId);
  if (user) {
    await user.activate();
    console.log('User activated:', user);
  }
}

```

**Step 5:** Query Active, Non-Deleted Documents.

The plugin provides a method findActiveNonDeleted to query only the documents that are both active and not soft deleted:

```bash
async function getActiveUsers() {
  const activeUsers = await User.findActiveNonDeleted();
  console.log('Active and non-deleted users:', activeUsers);
}

```

**Step 6:** Use Middleware for Filtering.

By default, the plugin adds middleware that filters out soft-deleted and inactive documents when you use find or findOne queries:

```bash
async function findUsers() {
  const users = await User.find();
  console.log('Filtered users (non-deleted and active only):', users);
}

```

**Step 7:**  Restore Soft-Deleted Documents (Optional).

If you want to restore a soft-deleted document, simply update its isDeleted field back to false:

```bash
async function restoreUser(userId) {
  const user = await User.findById(userId);
  if (user && user.isDeleted) {
    user.isDeleted = false;
    user.deletedAt = null;
    await user.save();
    console.log('User restored:', user);
  }
}

```

## Example

Here’s a complete example showing how to use the plugin with a User model:

```bash
const mongoose = require('mongoose');
const softDeletePlugin = require('mongoose-soft-delete');

// Define schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

// Apply the soft delete plugin
userSchema.plugin(softDeletePlugin);

// Create the model
const User = mongoose.model('User', userSchema);

async function run() {
  await mongoose.connect('mongodb://localhost:27017/testDB');

  // Create a user
  const user = new User({ name: 'John Doe', email: 'john@example.com' });
  await user.save();
  console.log('User created:', user);

  // Soft delete the user
  await user.softDelete();
  console.log('User soft deleted:', user);

  // Find all active, non-deleted users
  const activeUsers = await User.findActiveNonDeleted();
  console.log('Active users:', activeUsers);
  
  await mongoose.connection.close();
}

run().catch(console.error);

```


---

### Key Sections in the Usage:

1. **Step 1: Add the Plugin to Your Schema**: Explains how to add the plugin to a Mongoose schema.
2. **Step 2: Soft Delete a Document**: Shows how to use the soft delete method.
3. **Step 3: Deactivate a Document**: Demonstrates how to deactivate a document.
4. **Step 4: Activate a Document**: Reactivate a previously deactivated document.
5. **Step 5: Query Active, Non-Deleted Documents**: Use the `findActiveNonDeleted` method for querying active, non-deleted data.
6. **Step 6: Use Middleware for Filtering**: Automatically exclude soft-deleted or inactive documents from standard `find` queries.
7. **Step 7: Restore Soft-Deleted Documents (Optional)**: Explains how to manually restore a soft-deleted document.

This structure ensures that users of your plugin have a clear, step-by-step guide on how to integrate and use the plugin in their own projects!






