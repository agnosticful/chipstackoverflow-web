import { withKnobs } from "@storybook/addon-knobs";
import { addDecorator, addParameters } from "@storybook/react";

addParameters({
  viewport: {
    viewports: [
      {
        name: "iPhone 8",
        styles: { width: "375px", height: "667px", type: "mobile" }
      },
      {
        name: "iPhone 11 Pro Max",
        styles: { width: "414px", height: "896px", type: "mobile" }
      },
      {
        name: "iPhone 11 Pro",
        styles: { width: "375px", height: "812px", type: "mobile" }
      },
      {
        name: "iPad Mini",
        styles: { width: "1024px", height: "768px", type: "tablet" }
      },
      {
        name: 'iPad Pro 11"',
        styles: { width: "1194px", height: "834px", type: "tablet" }
      },
      {
        name: "Small Laptop",
        styles: { width: "1280px", height: "800px", type: "desktop" }
      },
      {
        name: "Medium Laptop",
        styles: { width: "1440px", height: "900px", type: "desktop" }
      }
    ]
  }
});

addDecorator(withKnobs);
