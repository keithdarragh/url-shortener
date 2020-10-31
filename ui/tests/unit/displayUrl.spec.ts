import { shallowMount } from '@vue/test-utils';
import DisplayUrl from '@/components/DisplayUrl.vue';

describe('DisplayUrl.vue', () => {
  it('renders props.url when passed', () => {
    const urls = [{
      fullUrl: 'http://google.com',
      shortUrl: 'http://pbid.com/123'
    }]
    const wrapper = shallowMount(DisplayUrl, {
      props: { urls },
    });
    expect(wrapper.props().urls).toStrictEqual(urls);
  });

  it('renders multiple props.urls when passed', () => {
    const urls = [{
      fullUrl: 'http://google.com',
      shortUrl: 'http://pbid.com/123'
    },
    {
      fullUrl: 'http://goal.com',
      shortUrl: 'http://pbid.com/abs'
    },
    {
      fullUrl: 'http://bbc.co.uk',
      shortUrl: 'http://pbid.com/adf'
    }
    ]
    const wrapper = shallowMount(DisplayUrl, {
      props: { urls },
    });
    expect(wrapper.props().urls).toStrictEqual(urls);
  });
});
