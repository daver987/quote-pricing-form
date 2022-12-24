<template>
  <div class="relative flex items-start">
    <div class="flex h-5 items-center">
      <input
        id="comments"
        aria-describedby="comments-description"
        name="comments"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
      />
    </div>
    <div class="ml-3 text-sm">
      <label for="comments" class="font-medium text-gray-700">Comments</label>
      <p id="comments-description" class="text-gray-500">
        Get notified when someones posts a comment on a posting.
      </p>
    </div>
  </div>
</template>
