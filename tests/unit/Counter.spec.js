import {createLocalVue, shallowMount} from "@vue/test-utils";
import Counter from "@/Counter";
import Vuex from "vuex";
import store from "@/store";

describe("Counter.vue", () => {

    describe("Check component is exists", () => {
        //this is 1
        it('should counter component exists', function () {
            const wrapper = mountComponent()
            expect(wrapper.exists()).toBeTruthy()
        });
        //this is 2
        it('should increase button exists', function () {
            const wrapper = mountComponent()
            const increaseButton = wrapper.find("#increase")
            expect(increaseButton.exists()).toBeTruthy()
        });
        //this is 3
        it('should decrease button exists', function () {
            const wrapper = mountComponent()
            const decreaseButton = wrapper.find("#decrease")
            expect(decreaseButton.exists()).toBeTruthy()
        });
        //this is on me
        it('should count   exists', function () {
            const wrapper = mountComponent()
            const countSpan = wrapper.find("#count")
            expect(countSpan.exists()).toBeTruthy()
        });
        //this is 7
        it('should count   text exists', function () {
            const wrapper = mountComponent()
            const countSpan = wrapper.find("#count")
            expect(countSpan.text()).toEqual(wrapper.vm.$store.state.count + "k")
        });
    })
    describe('Component method functionality test', function () {


        it('should increase method call increment function', function () {
            let dispatch = jest.fn()
            const localThis = {
                $store: {
                    dispatch
                }
            }
            Counter.methods.increase.call(localThis)
            expect(dispatch).toHaveBeenCalledWith("increment")

        });
        it('should decrease method call decrement function', function () {
            let dispatch = jest.fn()

            const localThis = {
                $store: {
                    dispatch
                }
            }
            Counter.methods.decrease.call(localThis)
            expect(dispatch).toHaveBeenCalledWith("decrement")

        });

    });
    describe("Buttons functionalty test", () => {

        //this is 4
        it('should increment button run correctly ', async function () {
            let dispatch = jest.fn()

            const wrapper = mountComponent()
            wrapper.vm.$store.dispatch = dispatch
            const button = wrapper.find("#increase")
            await button.trigger('click')
            await wrapper.vm.$nextTick()
            expect(dispatch).toHaveBeenCalledWith("increment")
        });
        //this is 5
        it('should decrement button run correctly ', async function () {
            let dispatch = jest.fn()

            const wrapper = mountComponent()
            wrapper.vm.$store.dispatch = dispatch
            const button = wrapper.find("#decrease")
            await button.trigger('click')
            await wrapper.vm.$nextTick()
            expect(dispatch).toHaveBeenCalledWith("decrement")
        });
        //this is 6
        it("two forward one back", async function () {
            const wrapper=mountComponent();
           //nedendir bilmem ama burda store'u spread edince hata veriyor.
            wrapper.vm.$store=store
            const increaseButton = wrapper.find("#increase")
            const decreaseButton = wrapper.find("#decrease")
            await increaseButton.trigger('click')
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.$store.state.count).toEqual(1)
            await increaseButton.trigger('click')
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.$store.state.count).toEqual(2)
            decreaseButton.trigger("click")
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.$store.state.count).toEqual(1)

        });
    })

})

function mountComponent() {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const wrapper = shallowMount(Counter, {
        localVue,
        store: new Vuex.Store({
            state: {
                count: 0
            },

        })
    })
    return wrapper;
}