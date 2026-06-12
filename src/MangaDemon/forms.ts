/* SPDX-License-Identifier: GPL-3.0-or-later */
/* Copyright © 2026 Inkdex */

import { ContentRating, Form, Section, ToggleRow } from "@paperback/types";

const SHOW_ALL_CONTENT_KEY = "showAllContent";

export function getShowAllContent(): boolean {
  return (Application.getState(SHOW_ALL_CONTENT_KEY) as boolean | undefined) ?? false;
}

export function getContentRating(): ContentRating {
  return getShowAllContent() ? ContentRating.EVERYONE : ContentRating.MATURE;
}

export class MangaDemonSettingsForm extends Form {
  private showAllContent = getShowAllContent();

  override getSections() {
    return [
      Section({ id: "content", footer: "Unblur every cover." }, [
        ToggleRow("showAllContent", {
          title: "Unblur All content",
          value: this.showAllContent,
          onValueChange: Application.Selector(this as MangaDemonSettingsForm, "update"),
        }),
      ]),
    ];
  }

  async update(value: boolean): Promise<void> {
    this.showAllContent = value;
    Application.setState(value, SHOW_ALL_CONTENT_KEY);
  }
}
