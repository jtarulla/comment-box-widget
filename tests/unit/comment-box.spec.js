import { shallowMount } from '@vue/test-utils'
import HypCommentBox from '@/components/comment-box.vue'

const mockData = [
  {
    username: 'jwillisb',
    avatar_url: 'https://secure.gravatar.com/avatar/6d18b464f665c600965e869e0d312ad9?d=mm',
    name: 'Joseph Willis'
  },
  {
    username: 'rmurrayc',
    avatar_url: 'https://secure.gravatar.com/avatar/1f1356a7bf48b072ec34dadbe9323be2?d=mm',
    name: 'Raymond Murray'
  },
  {
    username: 'lmontgomeryd',
    avatar_url: 'https://secure.gravatar.com/avatar/174de803acffda6363801437b8170e0d?d=mm',
    name: 'Laura Montgomery'
  }
]

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ users: mockData }),
  })
);

let wrapper

beforeEach(() => {
  fetch.mockClear()
  wrapper = shallowMount(HypCommentBox)
})

const userList = () => wrapper.findComponent({ ref: 'menu' })
const commentBox = () => wrapper.findComponent({ ref: 'textarea' })


describe('HypCommentBox', () => {
  it('shows user list when `@` is typed', async () => {
    await commentBox().vm.$emit('input', '@')

    expect(userList().isVisible()).toBe(true)
  })
})
