import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { usePromise } from '../.';

interface SampleResponse {
  slideshow: {
    title: string,
    date: string,
    author: string,
    slides: Array<{
      title: string,
      type: string,
      items?: string[],
    }>,
  },
}

function App() {

  const response = usePromise(fetch('https://httpbin.org/json'), [])

  const response2 = usePromise<SampleResponse>(async () => {
    const response = await fetch('https://httpbin.org/json')
    console.log('status', response.status);
    return response.json()
  }, [])

  return (
    <div>
      Example: {response.status === 'FULFILLED' && response.resolved.status}
      
      <br/><br/>

      Example 2: {response2.status === 'FULFILLED' && response2.resolved.slideshow.title}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
