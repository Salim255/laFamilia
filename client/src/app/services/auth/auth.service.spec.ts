import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";

describe("AuthService", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  //Specification
  it("Should signup a new user", () => {
    //To tell that the test not ready
    pending();
  });

  it("Should signup a new user2", () => {
    //To tell that the test not ready
    fail();
  });
});
