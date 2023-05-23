import { h } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import { useLoadTopic } from "../hooks/use-load-topic"


export default function Dialog() {
  const [isActive, setIsActive] = useState(false);
  const [topicHtml, setTopicHtml] = useState('');

  useLoadTopic(async ({topicId})=> {
    
    const url = `/resume/posts/${topicId}`
    const htmlData = await fetch(url, {
      headers: {
        Accept: 'text/html',
      },
    }).then(res => res.text());
    const node = new DOMParser().parseFromString(htmlData, 'text/html');
    const topicHtml = node?.getElementById('main-content')?.outerHTML || '';
    if (topicHtml) {
      setIsActive(true)
      setTopicHtml(topicHtml);
    }
  })


  if (!isActive) {
    return null;
  }

  return (
    <div class="bg-smoke-light fixed inset-0 z-50 flex overflow-auto">
      <div class="relative m-auto flex w-full max-w-lg flex-col rounded-lg bg-white p-8 shadow-lg">
        <button type="button" class="absolute top-4 right-4" onClick={() => setIsActive(false)}>X</button>
        <div
          id="topic-content"
          class="py-5"
          dangerouslySetInnerHTML={{ __html: topicHtml }}
        ></div>
        <div class="flex justify-center">
          <div class="p-1">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => setIsActive(false)}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
