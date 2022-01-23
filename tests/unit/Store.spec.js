import {actions, mutations} from "@/store";

describe("Store.js", () => {
    describe("actions work correctly", () => {
        it('should increment method work correctly', function () {
            const context = {
                commit: jest.fn()
            }
            actions.increment(context)
            expect(context.commit).toHaveBeenCalledWith('addToCount', 1)
        });
        it('should  decrement method work correctly', function () {
            const context = {
                commit: jest.fn()
            }
            actions.decrement(context)
            expect(context.commit).toHaveBeenCalledWith('addToCount', -1)
        });
    })

    it('should mutations work correctly', function () {
        let state = {
            count: 5
        }
        mutations.addToCount(state, 1)
        expect(state.count).toEqual(6)
    });

})