import React from 'react'

interface Block {
  id: string
  type: string
  data: {
    text?: string
    level?: number
    url?: string
    caption?: string
    alt?: string
    style?: string
    items?: string[]
    title?: string
    buttonText?: string
    [key: string]: unknown
  }
}

interface ArticleContentProps {
  blocks: Block[]
}

export function ArticleContent({ blocks }: ArticleContentProps) {
  const renderBlock = (block: Block) => {
    switch (block.type) {
      case 'header':
        const HeaderTag = `h${block.data.level || 2}` as keyof React.JSX.IntrinsicElements
        return (
          <HeaderTag
            key={block.id}
            className={`font-title text-brand-dark mb-4 ${
              block.data.level === 1 ? 'text-3xl' :
              block.data.level === 2 ? 'text-2xl' :
              block.data.level === 3 ? 'text-xl' :
              'text-lg'
            }`}
          >
            {block.data.text}
          </HeaderTag>
        )

      case 'paragraph':
        return (
          <p
            key={block.id}
            className="text-gray-700 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: block.data.text || '' }}
          />
        )

      case 'image':
        return (
          <figure key={block.id} className="mb-8">
            <img
              src={block.data.url}
              alt={block.data.alt || block.data.caption || ''}
              className="w-full rounded-lg shadow-md"
            />
            {block.data.caption && (
              <figcaption className="text-sm text-gray-500 text-center mt-2">
                {block.data.caption}
              </figcaption>
            )}
          </figure>
        )

      case 'quote':
        return (
          <blockquote
            key={block.id}
            className="border-r-4 border-brand-accent bg-gray-50 p-6 mb-6 italic text-lg"
          >
            <p className="text-gray-700 mb-2">{block.data.text}</p>
            {block.data.caption && (
              <cite className="text-sm text-gray-500">— {block.data.caption}</cite>
            )}
          </blockquote>
        )

      case 'list':
        const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul'
        return (
          <ListTag
            key={block.id}
            className={`mb-6 space-y-2 ${
              block.data.style === 'ordered' ? 'list-decimal' : 'list-disc'
            } list-inside`}
          >
            {block.data.items?.map((item: string, index: number) => (
              <li key={index} className="text-gray-700 leading-relaxed">
                {item}
              </li>
            ))}
          </ListTag>
        )

      case 'cta':
        return (
          <div key={block.id} className="bg-brand-accent/10 rounded-lg p-6 mb-6 text-center">
            <h3 className="text-xl font-title text-brand-dark mb-2">
              {block.data.title}
            </h3>
            <p className="text-gray-600 mb-4">{block.data.text}</p>
            {block.data.buttonText && (
              <button className="bg-brand-accent text-white px-6 py-2 rounded-lg hover:bg-brand-accent/90 transition-colors">
                {block.data.buttonText}
              </button>
            )}
          </div>
        )

      default:
        return (
          <div key={block.id} className="bg-gray-100 p-4 rounded mb-4">
            <p className="text-gray-500">Unsupported block type: {block.type}</p>
          </div>
        )
    }
  }

  if (!blocks || blocks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        תוכן המאמר לא זמין
      </div>
    )
  }

  return (
    <div className="article-content">
      {blocks.map(renderBlock)}
    </div>
  )
}
