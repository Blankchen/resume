import { h } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';

type Prop = {
  title: string;
  children: ComponentChildren;
};

export default function Dialog(prop: Prop) {
  const { title, children } = prop;
  const [isActive, setIsActive] = useState(true);
  const [topicHtml, setTopicHtml] = useState('');

  useEffect(() => {
    getTopicDetail();
  }, []);

  const getTopicDetail = async () => {
    const url = '/resume/posts/post-1/'
    const htmlData = await fetch(url, {
      headers: {
        Accept: 'text/html',
      },
    }).then(res => res.text());
    const node = new DOMParser().parseFromString(htmlData, 'text/html');
    const topicHtml = node?.getElementById('main-content')?.outerHTML || '';

    setTopicHtml(topicHtml);
  }


  if (!isActive) {
    return null;
  }

  return (
    <div class="bg-smoke-light fixed inset-0 z-50 flex overflow-auto">
      <div class="relative m-auto flex w-full max-w-md flex-col rounded-lg bg-white p-8 shadow-lg">
        <h2 class="text-xl">{title}</h2>
        <div class="py-5">{children}</div>
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
