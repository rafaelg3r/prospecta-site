// Viewport margin for "enter once" animations: the observed area reaches far above
// the screen, so anything the visitor scrolled past (a fast flick, End, a jump to
// an anchor) still counts as seen and is revealed, instead of staying hidden
// behind its mask until it is scrolled back into view.
export const REVEAL_MARGIN = "100000px 0px 0px 0px";
