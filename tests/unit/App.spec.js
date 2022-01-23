import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuex, {mapGetters} from "vuex";
import App from "@/App";
import {getters} from "@/store";

describe("App.vue", () => {
    //this is for 1-2 conditions
    describe("component should exists ",()=>{
        it('should h1 exists', function () {
            const wrapper = mountComponent()
            const headerText = wrapper.find("h1")
            expect(headerText.exists()).toBeTruthy();
        });
        it('should h1 have correct value', function () {
            const wrapper = mountComponent()
            const headerText = wrapper.find("h1")
            const dailyCoronaCasesInTurkey = "Daily Corona Cases in Turkey";
            expect(headerText.text()).toEqual(dailyCoronaCasesInTurkey);
        });
    })

    //this is for 3-4 conditions
    describe('should notificationArea display correct style', function () {
        const testCases = [
            {
                caseDef: 'when count bigger than 10',
                caseCount: 11,
                expectedClass: 'danger',
                messageText:`Danger!!! Case count is 11k`

            },
            {
                caseDef: 'when count smaller than 10 and bigger than 5',
                caseCount: 7,
                expectedClass: 'normal',
                messageText:`Life is normal. Case count is 7k`
            },
            {
                caseDef: 'when count smaller than 5',
                caseCount: 2,
                expectedClass: 'safe',
                messageText:`So safe. Case count is 2k`
            }
        ]

        for (let testCase of testCases) {
            it(testCase.caseDef, function () {
                const localThis = {
                    $store: {
                        state: {
                            count: testCase.caseCount
                        }
                    }
                }

                const message = App.computed.message.call(localThis)

                 expect(message).toEqual(testCase.messageText)
            });
            it(testCase.caseDef, function () {
                const wrapper=mountComponent(testCase.caseCount)
                const notificationArea=wrapper.find(".notificationArea")
                expect(notificationArea.classes()).toContain(testCase.expectedClass)
            });

        }

    });
})

function mountComponent(initCount=0) {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const wrapper = shallowMount(App, {
        localVue,
        store: new Vuex.Store({
            state:{
                count:initCount
            },
            getters

        })
    })
    return wrapper;
}