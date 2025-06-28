// app/incidents/create/page.tsx

export default function CreateIncidentPage() {
    return (
      <main className="flex min-h-screen flex-col items-center p-24 bg-gray-50">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
            Log a New Incident
          </h1>
  
          {/* We will connect this form to a Server Action later */}
          <form className="space-y-6">
            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                Summary
              </label>
              <input
                type="text"
                id="summary"
                name="summary"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Email server is not responding"
                required
              />
              <p className="mt-1 text-xs text-gray-500">A brief, one-line summary of the issue.</p>
            </div>
  
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                defaultValue="medium"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
  
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Submit Incident
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }