// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// type Props = {
//   state: string;
//   onStart: () => void;
//   onStop: () => void;
//   onBackToHome?: () => void;
// };

// export function ScreenControlsCard({
//   state,
//   onStart,
//   onStop,
//   onBackToHome,
// }: Props) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Controls</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {state === "idle" && (
//           <Button className="w-full cursor-pointer" size="lg" onClick={onStart}>
//             Start Screen Share
//           </Button>
//         )}

//         {state === "requesting" && (
//           <div className="flex flex-col items-center gap-3">
//             <div className="w-6 h-6 border-2 border-ring border-t-transparent rounded-full animate-spin" />
//             <p className="text-sm text-muted-foreground text-center">
//               Waiting for permission popup...
//             </p>
//           </div>
//         )}

//         {state === "granted" && (
//           <Button
//             variant="destructive"
//             className="w-full cursor-pointer"
//             onClick={onStop}>
//             Stop Screen Share
//           </Button>
//         )}

//         {(state === "denied" ||
//           state === "cancelled" ||
//           state === "error" ||
//           state === "stopped") && (
//           <>
//             {state === "stopped" && (
//               <p className="text-sm font-medium text-center text-muted-foreground">
//                 Screen sharing stopped
//               </p>
//             )}
//             <div className="flex flex-col gap-2">
//               <Button
//                 className="w-full cursor-pointer"
//                 size="lg"
//                 onClick={onStart}>
//                 Retry Screen Test
//               </Button>
//               {onBackToHome && (
//                 <Button
//                   variant="outline"
//                   className="w-full cursor-pointer"
//                   onClick={onBackToHome}>
//                   Back to Home
//                 </Button>
//               )}
//             </div>
//           </>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StopConfirmDialog } from "./stop-confirm-dialog";

type Props = {
  state: string;
  onStart: () => void;
  onConfirmStop: () => void;
  onBackToHome?: () => void;
};

export function ScreenControlsCard({
  state,
  onStart,
  onConfirmStop,
  onBackToHome,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {state === "idle" && (
          <Button className="w-full cursor-pointer" size="lg" onClick={onStart}>
            Start Screen Share
          </Button>
        )}

        {state === "requesting" && (
          <div className="flex flex-col items-center gap-3 py-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-ring border-t-transparent" />
            <p className="text-sm text-muted-foreground text-center">
              Waiting for permission popup...
            </p>
          </div>
        )}

        {state === "granted" && (
          <StopConfirmDialog onConfirm={onConfirmStop} />
        )}

        {(state === "denied" ||
          state === "cancelled" ||
          state === "error" ||
          state === "stopped") && (
          <div className="space-y-4">
            {state === "stopped" && (
              <p className="text-sm font-medium text-center text-muted-foreground">
                Screen sharing stopped
              </p>
            )}
            {(state === "denied" ||
              state === "cancelled" ||
              state === "error") && (
              <p className="text-sm text-center text-muted-foreground">
                {state === "denied" && "Permission was denied."}
                {state === "cancelled" && "You cancelled the picker."}
                {state === "error" && "Something went wrong."}
              </p>
            )}
            <div className="flex flex-col gap-2">
              <Button
                className="w-full cursor-pointer"
                size="lg"
                onClick={onStart}>
                Retry Screen Test
              </Button>
              {onBackToHome && (
                <Button
                  variant="outline"
                  className="w-full cursor-pointer"
                  onClick={onBackToHome}>
                  Back to Home
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
