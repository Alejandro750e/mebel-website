'use client'
import { memo } from 'react'
import { WorkItem as WorkItemType } from './types'

const WorkItem = memo(({ work, onOpen }: { work: WorkItemType; onOpen: (work: WorkItemType) => void }) => (
  <div
    className="group cursor-pointer hover-lift transition-transform duration-300 hover:scale-[1.02] active:scale-95"
    onClick={() => onOpen(work)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onOpen(work)
      }
    }}
    aria-label={`Открыть ${work.title}`}
  >
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 aspect-square md:aspect-[4/3] border border-blue-200/50 shadow-lg">
      {work.category === "До/После" ? (
        <img
          src="/T.jpg"
          alt={work.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : work.images[0] && work.images[0] !== "/api/placeholder/600/400" ? (
        <img
          src={work.images[0]}
          alt={work.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-2 animate-float">🏠</div>
            <p className="text-sm">{work.title}</p>
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 md:p-6">
        <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm md:text-lg font-semibold mb-1 md:mb-2 line-clamp-1">
            {work.title}
          </p>
          <p className="text-xs md:text-sm text-blue-100">
            {work.category}
          </p>
          {work.images.length > 1 && (
            <p className="text-xs text-blue-200 mt-1">
              {work.images.length} фото
            </p>
          )}
        </div>
      </div>
    </div>
    
    <div className="mt-2 md:mt-3">
      <h3 className="text-sm md:text-base font-semibold text-white mb-1 line-clamp-1">
        {work.title}
      </h3>
      <p className="text-xs md:text-sm text-white/80 line-clamp-2">
        {work.description}
      </p>
    </div>
  </div>
))

WorkItem.displayName = 'WorkItem'

export default WorkItem