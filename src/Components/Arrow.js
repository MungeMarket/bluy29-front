import React from "react";

export function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <article
      className={className}
      style={{
        ...style,
        display: "block",
        background: "red",
        width: "30px",
        display: "flex",
        alignItems: "center",
        right: "3px",
      }}
      onClick={onClick}
    />
  );
}

export function PrevArrow(props) {
  const { className, style, onClick } = props;

  return (
    <article
      className={className}
      style={{
        ...style,
        display: "block",
        background: "green",
        width: "30px",
        display: "flex",
        alignItems: "center",
        left: "3px",
      }}
      onClick={onClick}
    />
  );
}

// adaptiveHeight?: boolean | undefined;
// afterChange?(currentSlide: number): void;
// appendDots?(dots: React.ReactNode): JSX.Element;
// arrows?: boolean | undefined;
// asNavFor?: Slider | undefined;
// autoplaySpeed?: number | undefined;
// beforeChange?(currentSlide: number, nextSlide: number): void;
// centerMode?: boolean | undefined;
// centerPadding?: string | undefined;
// children?: React.ReactNode;
// className?: string | undefined;
// cssEase?: string | undefined;
// customPaging?(index: number): JSX.Element;
// dotsClass?: string | undefined;
// dots?: boolean | undefined;
// draggable?: boolean | undefined;
// easing?: string | undefined;
// edgeFriction?: number | undefined;
// fade?: boolean | undefined;
// focusOnSelect?: boolean | undefined;
// infinite?: boolean | undefined;
// initialSlide?: number | undefined;
// lazyLoad?: LazyLoadTypes | undefined;
// nextArrow?: JSX.Element | undefined;
// onEdge?(swipeDirection: SwipeDirection): void;
// onInit?(): void;
// onLazyLoad?(slidesToLoad: number[]): void;
// onReInit?(): void;
// onSwipe?(swipeDirection: SwipeDirection): void;

// pauseOnFocus?: boolean | undefined;
// pauseOnHover?: boolean | undefined;
// prevArrow?: JSX.Element | undefined;
// responsive?: ResponsiveObject[] | undefined;
// rows?: number | undefined;
// rtl?: boolean | undefined;
// slide?: string | undefined;
// slidesPerRow?: number | undefined;
// slidesToScroll?: number | undefined;
// slidesToShow?: number | undefined;
// speed?: number | undefined;
// swipeToSlide?: boolean | undefined;
// swipe?: boolean | undefined;
// swipeEvent?(swipeDirection: SwipeDirection): void;
// touchMove?: boolean | undefined;
// touchThreshold?: number | undefined;
// useCSS?: boolean | undefined;
// useTransform?: boolean | undefined;
// variableWidth?: boolean | undefined;
// vertical?: boolean | undefined;
// verticalSwiping?: boolean | undefined;
// waitForAnimate?: boolean | undefined;
