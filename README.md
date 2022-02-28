# ivy assignment

## How to start

Run `yarn install`

Run `yarn dev`

## Focus

I focused on a clean setup including a ready-to-go testing environment using cypress + cypress component tests.

I choose theme-ui for simple styling options (I wanted to use jss "in-place" without performance drawbacks) and chose to add stylings to elements directly in the JSX tree. Even though this might "blow up" the JSX, I think it is far easier to "read" than having numerous different `styled.div` components or styles in other files. The single-file component approach is also easier to maintain.

Then I used react-query and msw to locally simulate real backend calls and work with asynchronity from the get-go.

Next I started building the technical architecture of the screens. Where they get their data, how that data is structured and what a possible DOM structure could be. After the screens worked technical I began to apply styles.

I focused mainly on the technical implementations of the assignment and applied styles afterwards. I ran out of time to do them properly.

Ideally I would after having done the styles made a refactoring pass and looked where I can split / refactor "subcomponents" into their own files. Also this would be the point I usually add tests (on reusable-components I introduced, and on the screens I implemented as integration tests).
