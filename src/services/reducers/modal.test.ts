import {modalReducer} from "./modal";
import {closeModal, openOrderModal} from "../actions/modal";


describe("modal reducer", () => {
  it("test initial state", () => {
    // @ts-ignore
    expect(modalReducer(undefined, {})).toEqual({
      isOrderModalVisible: false,
    })

  })
  it("should set modal invisible", () => {
    expect(modalReducer(undefined, closeModal())).toEqual({
      isOrderModalVisible: false,
    })
  })

  it("should set modal visible", () => {
    expect(modalReducer(undefined, openOrderModal())).toEqual({
      isOrderModalVisible: true,
    })
  })
})
