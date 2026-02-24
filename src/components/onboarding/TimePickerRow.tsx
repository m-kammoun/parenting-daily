import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useColors } from "@/theme";
import { useColorScheme } from "react-native";

interface TimePickerRowProps {
  time: Date;
  onChange: (date: Date) => void;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function TimePickerRow({ time, onChange }: TimePickerRowProps) {
  const [showPicker, setShowPicker] = useState(false);
  const C = useColors();
  const scheme = useColorScheme();

  const handleChange = (_event: DateTimePickerEvent, selected?: Date) => {
    if (selected) onChange(selected);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.row, { backgroundColor: C.card }]}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.75}
      >
        <Text style={[styles.label, { color: C.text }]}>Notify me at</Text>
        <View style={[styles.chip, { backgroundColor: C.purple }]}>
          <Text style={styles.chipText}>
            {pad(time.getHours())}:{pad(time.getMinutes())}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Android: native dialog */}
      {Platform.OS === "android" && showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="spinner"
          onChange={(e, selected) => {
            setShowPicker(false);
            if (selected) onChange(selected);
          }}
          is24Hour
        />
      )}

      {/* iOS: bottom-sheet modal */}
      {Platform.OS !== "android" && (
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
          onRequestClose={() => setShowPicker(false)}
        >
          <TouchableOpacity
            style={[styles.modalOverlay, { backgroundColor: C.modalOverlay }]}
            activeOpacity={1}
            onPress={() => setShowPicker(false)}
          />
          <View style={[styles.modalSheet, { backgroundColor: C.card }]}>
            <View style={[styles.modalHandle, { backgroundColor: C.cardAlt }]} />
            <View style={[styles.modalHeader, { borderBottomColor: C.border }]}>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Text style={[styles.modalCancel, { color: C.textMuted }]}>Cancel</Text>
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: C.text }]}>Notification time</Text>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Text style={[styles.modalDone, { color: C.purple }]}>Done</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.pickerWrapper, { backgroundColor: C.card }]}>
              <DateTimePicker
                value={time}
                mode="time"
                display="spinner"
                onChange={handleChange}
                themeVariant={scheme === "dark" ? "dark" : "light"}
                style={styles.picker}
                is24Hour
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  chip: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  /* iOS modal */
  modalOverlay: {
    flex: 1,
  },
  modalSheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: 36,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 4,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  modalCancel: {
    fontSize: 15,
    fontWeight: "500",
  },
  modalDone: {
    fontSize: 15,
    fontWeight: "700",
  },
  pickerWrapper: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 18,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 200,
  },
});
