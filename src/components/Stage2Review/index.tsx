import React, {createContext, useContext, useEffect, useState, type ReactNode} from 'react';

const ReviewContent = createContext<ReactNode>(null);
const RegisterReview = createContext<((content: ReactNode) => void) | null>(null);

/** Keep review content in the MDX source while presenting it only in the audit tab. */
export function Stage2ReviewProvider({children}: {children: ReactNode}) {
  const [content, setContent] = useState<ReactNode>(null);
  return <RegisterReview.Provider value={setContent}>
    <ReviewContent.Provider value={content}>{children}</ReviewContent.Provider>
  </RegisterReview.Provider>;
}

export default function Stage2Review({children}: {children: ReactNode}) {
  const register = useContext(RegisterReview);
  useEffect(() => {
    register?.(children);
    return () => register?.(null);
  }, [register, children]);
  return null;
}

export function Stage2ReviewOutlet() {
  return <>{useContext(ReviewContent)}</>;
}
