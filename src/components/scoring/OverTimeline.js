import React from "react";
import { View, Text, ScrollView } from "react-native";

const OverTimeline = ({ timeline = [] }) => {
  return (
    <View className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs mb-4">
      <Text className="text-slate-500 text-xs font-bold uppercase mb-2">
        This Over Timeline
      </Text>

      {timeline.length === 0 ? (
        <Text className="text-slate-400 text-xs italic py-1">
          Ready for first ball of the over...
        </Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {timeline.map((ballTag, idx) => {
            let bgClass = "bg-slate-100 border-slate-300 text-slate-800";
            if (ballTag === "4") bgClass = "bg-blue-500 border-blue-600 text-white";
            else if (ballTag === "6") bgClass = "bg-emerald-600 border-emerald-700 text-white";
            else if (ballTag === "W") bgClass = "bg-red-600 border-red-700 text-white";
            else if (ballTag.includes("Wd") || ballTag.includes("Nb"))
              bgClass = "bg-amber-500 border-amber-600 text-white";

            return (
              <View
                key={idx}
                className={`w-9 h-9 rounded-full justify-center items-center mr-2 border shadow-xs ${bgClass}`}
              >
                <Text className="font-extrabold text-xs">{ballTag}</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default OverTimeline;
