import { getTestRooms } from '@/lib/sanity'

// This runs at BUILD TIME for static export
export default async function Home() {
  const rooms = await getTestRooms()

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3 text-gray-900">
            Sanity + Hostinger Test
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Static export fetched from Sanity at build time
          </p>
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            ✓ Ready for Hostinger deployment
          </div>
        </div>

        {rooms.length === 0 ? (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 text-center">
            <p className="text-yellow-800 text-lg">
              No rooms found. Create one in Sanity Studio, then rebuild this site.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room: any) => (
              <div
                key={room._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {room.imageUrl && (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={room.imageUrl}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {room.name}
                  </h2>

                  <div className="mb-4">
                    <span className="text-4xl font-bold text-green-600">
                      ${room.price}
                    </span>
                    <span className="text-gray-500 ml-2">/night</span>
                  </div>

                  {room.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {room.description}
                    </p>
                  )}

                  {room.features && room.features.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">
                        Features
                      </h3>
                      <ul className="space-y-1">
                        {room.features.slice(0, 4).map((feature: string, i: number) => (
                          <li key={i} className="text-sm text-gray-600 flex items-center">
                            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                        {room.features.length > 4 && (
                          <li className="text-sm text-gray-400 italic">
                            +{room.features.length - 4} more
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
          <h3 className="font-bold text-blue-900 text-xl mb-4">
            📦 Deployment Workflow:
          </h3>
          <ol className="list-decimal list-inside space-y-3 text-blue-800">
            <li>Edit content in Sanity Studio (http://localhost:3333)</li>
            <li>Publish changes</li>
            <li>Run <code className="bg-blue-100 px-2 py-1 rounded">npm run build</code> (fetches Sanity data)</li>
            <li>Upload <code className="bg-blue-100 px-2 py-1 rounded">out/</code> folder to Hostinger via FTP</li>
            <li>Site is live with updated content!</li>
          </ol>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Built: {new Date().toLocaleString()}</p>
          <p className="mt-1">Data fetched from Sanity at build time</p>
        </div>
      </div>
    </main>
  )
}
