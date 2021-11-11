/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {MDCObserverFoundation} from '@material/base/observer-foundation';

import {MD3SwitchState} from './state';

/**
 * `MD3SwitchFoundation` provides a state-only foundation for a switch
 * component.
 *
 * State observers and event handler entrypoints update a component's adapter's
 * state with the logic needed for switch to function.
 */
export class MD3SwitchFoundation extends MDCObserverFoundation<MD3SwitchState> {
  constructor(adapter: MD3SwitchState) {
    super(adapter);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Initializes the foundation and starts observing state changes.
   */
  override init() {
    this.observe(this.adapter, {
      disabled: this.stopProcessingIfDisabled,
      processing: this.stopProcessingIfDisabled,
    });
  }

  /**
   * Event handler for switch click events. Clicking on a switch will toggle its
   * selected state.
   */
  handleClick() {
    if (this.adapter.disabled) {
      return;
    }

    this.adapter.selected = !this.adapter.selected;
  }

  protected stopProcessingIfDisabled() {
    if (this.adapter.disabled) {
      this.adapter.processing = false;
    }
  }
}
