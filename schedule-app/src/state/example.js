export default {
  selectedEventIds: [],
  constraints: {},
  eventContext: {
    minutesPerUnit: 15,
    range: {
      min: 0,
      max: 672
    }
  },
  constrainedEvents: {
    work1: {
      id: `work1`,
      name: `work`,
      start: {
        min: 0,
        max: 95
      },
      end: {
        min: 0,
        max: 95
      },
      duration: {
        min: 24,
        max: 58
      }
    },
    work2: {
      id: `work2`,
      name: `work`,
      start: {
        min: 96,
        max: 191
      },
      end: {
        min: 96,
        max: 191
      },
      duration: {
        min: 24,
        max: 58
      }
    },
    work3: {
      id: `work3`,
      name: `work`,
      start: {
        min: 192,
        max: 287
      },
      end: {
        min: 192,
        max: 287
      },
      duration: {
        min: 24,
        max: 58
      }
    },
    work4: {
      id: `work4`,
      name: `work`,
      start: {
        min: 288,
        max: 383
      },
      end: {
        min: 288,
        max: 383
      },
      duration: {
        min: 24,
        max: 58
      }
    },
    work5: {
      id: `work5`,
      name: `work`,
      start: {
        min: 384,
        max: 479
      },
      end: {
        min: 384,
        max: 479
      },
      duration: {
        min: 24,
        max: 58
      }
    }
  }
}
