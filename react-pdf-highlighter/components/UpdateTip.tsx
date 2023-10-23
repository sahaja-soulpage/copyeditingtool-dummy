import React, { Component } from "react";

interface State {
    compact: boolean;
    text: string;
    emoji: string;
    show: boolean;
}

interface Props {
    contentVal: string;
    // setContentVal: any;
    highlights: any;
    highlight: any;
    onConfirm: (comment: { text: string; emoji: string }) => void;
    onOpen?: () => void;
    onUpdate?: () => void;
    onDelete?: (highlight) => void;
    deletedHighlights: any;
    render: boolean;
    updateHighlight: any;
    hstate: any;
}

export class UpdateTip extends Component<Props, State> {
    state: State = {
        compact: true,
        text: "",
        emoji: "",
        show: true,
    };

    // for TipContainer
    componentDidUpdate(nextProps: Props, nextState: State) {
        const { onUpdate, render } = this.props;
        if (render) {
        }
    }

    render() {
        const { onConfirm, onOpen, contentVal, onDelete, highlights, deletedHighlights, highlight, render } = this.props;
        const { compact, text, emoji, show } = this.state;
        return (

            <>
                {show ?
                    <div className="Tip">
                        {compact ? (
                            <>
                                <div
                                    className="Tip__compact"
                                    onClick={() => {
                                        // onOpen();
                                        this.setState({ compact: false });
                                    }}
                                >
                                    {contentVal}
                                </div>
                                <button
                                    id={highlight.id}
                                    onClick={() => {
                                        highlights.map((item, index) => {
                                            const pos = highlights.indexOf(item);
                                            if (item.id === highlight.id) {
                                                if (pos > -1) {
                                                    highlights.splice(pos, 1);
                                                }
                                                deletedHighlights.push(item)
                                            }
                                        })

                                        this.setState({ show: false })
                                    }}
                                >Resolve</button>
                            </>

                        ) : (
                            <form
                                className="Tip__card"
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    onConfirm({ text, emoji });
                                    this.setState({ compact: true });
                                }}
                            >
                                <div>
                                    <textarea
                                        placeholder="Your comment"
                                        autoFocus
                                        value={text}
                                        // onChange={setContentVal}
                                        onChange={(event) =>
                                            this.setState({ text: event.target.value })
                                        }
                                        ref={(node) => {
                                            if (node) {
                                                node.focus();
                                            }
                                        }}
                                    />
                                    {/* <div>
                {["💩", "😱", "😍", "🔥", "😳", "⚠️"].map((_emoji) => (
                  <label key={_emoji}>
                    <input
                      checked={emoji === _emoji}
                      type="radio"
                      name="emoji"
                      value={_emoji}
                      onChange={(event) =>
                        this.setState({ emoji: event.target.value })
                      }
                    />
                    {_emoji}
                  </label>
                ))}
              </div> */}
                                </div>
                                <div>
                                    <input type="submit" value="Save" />
                                </div>
                            </form>
                        )}
                    </div>
                    : ''}
            </>

        );
    }
}

export default UpdateTip;
