import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
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

let wrapper, vuetify, localVue

beforeEach(() => {
  fetch.mockClear()
  vuetify = new Vuetify()
  localVue = createLocalVue()
  document.body.setAttribute('data-app', true)
  wrapper = mount(HypCommentBox, {localVue, vuetify,  attachTo: document.body})
})

const userList = () => wrapper.findComponent({name: 'VMenu'})
const commentBox = () => wrapper.findComponent({name: 'VTextarea'})

describe('HypCommentBox', () => {
  it('shows user list when `@` is typed', async () => {
    await wrapper.vm.onKeyChange({key: '@'})

    expect(userList().props('value')).toBe(true)
  })

  it('filters users by typing after `@` sign', async () => {
    await wrapper.vm.onKeyChange({ key: '@' })
    await wrapper.setData({ input: '@lau' })

    expect(userList().findAllComponents('.v-list-item').at(0).text()).toBe('Laura Montgomery')
  })

  describe('on click user from list', () => {
    beforeEach(async () => {
      await wrapper.vm.onKeyChange({ key: '@' })
      await userList().findAllComponents('.v-list-item').at(1).trigger('click')
    })

    it('selects the user', () => {
      expect(commentBox().props('value')).toBe('Raymond Murray ')
    })

    it('closes the user list', () => {
      expect(userList().props('value')).toBe(false)
    })

    it('focus cursor on text area', () => {
      expect(commentBox().html()).toContain(document.activeElement.outerHTML)
    })
  })
})