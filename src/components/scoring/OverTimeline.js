import React from "react";
import { View, Text, ScrollView } from "react-native";

const OverTimeline = ({ timeline = ["0", "0", "1", "1", "CAO"] }) => {
  const displayTimeline = timeline.length > 0 ? timeline : [];

  return (
    <View className="py-4 px-4 bg-[#F8FAFC]">
      {displayTimeline.length === 0 ? (
        <View className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs items-center">
          <Text className="text-slate-400 text-xs font-semibold italic">
            Ready for first ball of the over...
          </Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row py-1">
          {displayTimeline.map((ballTag, idx) => {
            let circleStyle = "bg-white border-slate-300 text-slate-900";
            let tagText = ballTag;

            if (ballTag === "W" || ballTag === "CAO") {
              circleStyle = "bg-[#E11D48] border-[#BE123C] text-white";
              tagText = "CAO";
            } else if (ballTag === "4") {
              circleStyle = "bg-blue-600 border-blue-700 text-white";
            } else if (ballTag === "6") {
              circleStyle = "bg-emerald-600 border-emerald-700 text-white";
            } else if (ballTag.includes("Wd") || ballTag.includes("Nb")) {
              circleStyle = "bg-amber-500 border-amber-600 text-white";
            }

            return (
              <View
                key={idx}
                className={`w-12 h-12 rounded-full justify-center items-center mr-3 border-2 shadow-md ${circleStyle}`}
              >
                <Text
                  className={`font-black text-sm ${
                    ballTag === "W" || ballTag === "CAO" || ballTag === "4" || ballTag === "6"
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  {tagText}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default OverTimeline;
