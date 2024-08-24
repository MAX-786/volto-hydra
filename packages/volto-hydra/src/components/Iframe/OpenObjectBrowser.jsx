import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import React, { useEffect } from 'react';

const OpenObjectBrowser = (props) => {
  const { openObjectBrowser, closeObjectBrowser, isInlineEditingRef, origin } =
    props;

  useEffect(() => {
    const messageHandler = (e) => {
      if (e.origin !== origin) {
        return;
      }
      if (e.data.type === 'OPEN_OBJECT_BROWSER') {
        openObjectBrowser({
          mode: e.data.mode,
          propDataName: 'data',
          onSelectItem: (item) => {
            e.source.postMessage(
              {
                type: 'OBJECT_SELECTED',
                path: item,
              },
              e.origin,
            );
            closeObjectBrowser();
            isInlineEditingRef.current = true;
          },
        });
      }
    };
    window.addEventListener('message', messageHandler);
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, [closeObjectBrowser, isInlineEditingRef, openObjectBrowser, origin]);
  return <></>;
};

export default withObjectBrowser(OpenObjectBrowser);
