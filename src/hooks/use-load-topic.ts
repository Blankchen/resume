import { useEffect } from 'preact/hooks';

type CallbackType = (data: {
  topicId: string;
}) => void;

export function useLoadTopic(callback: CallbackType) {
  useEffect(() => {
    function handleTopicClick(e: any) {
      const { topicId } = e.detail;

      callback({
        topicId,
      });
    }

    window.addEventListener(`topic.click`, handleTopicClick);

    return () => {
      window.removeEventListener(`topic.click`, handleTopicClick);
    };
  }, []);
}
