// lib/softDelete.js

const softDeletePlugin = (schema) => {
    // Add soft delete and active/inactive fields
    schema.add({
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
        isActive: { type: Boolean, default: true }
    });

    // Method to soft delete a document
    schema.methods.softDelete = function () {
        this.isDeleted = true;
        this.deletedAt = new Date();
        return this.save();
    };

    // Method to deactivate a document
    schema.methods.deactivate = function () {
        this.isActive = false;
        return this.save();
    };

    // Method to activate a document
    schema.methods.activate = function () {
        this.isActive = true;
        return this.save();
    };

    // Static method to find non-deleted and active documents
    schema.statics.findActiveNonDeleted = function (query = {}) {
        return this.find({ ...query, isDeleted: false, isActive: true });
    };

    // Middleware to filter out deleted and inactive documents on find
    schema.pre('find', function () {
        this.where({ isDeleted: false, isActive: true });
    });

    schema.pre('findOne', function () {
        this.where({ isDeleted: false, isActive: true });
    });
};

module.exports = softDeletePlugin;
