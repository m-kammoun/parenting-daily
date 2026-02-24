import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { COLORS } from "../../theme";

interface TimePickerRowProps {
  time: Date;
  onChange: (date: Date) => void;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function TimePickerRow({ time, onChange }: TimePickerRowProps) {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (_event: DateTimePickerEvent, selected?: Date) => {
    if (selected) onChange(selected);
  };

  return (
    <>
      <TouchableOpacity style={styles.row} onPress={() => setShowPicker(true)} activeOpacity={0.75}>
        <Text style={styles.label}>Notify me at</Text>
        <View style={styles.chip}>
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
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowPicker(false)}
          />
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Text style={styles.modalCancel}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Notification time</Text>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Text style={styles.modalDone}>Done</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.pickerWrapper}>
              <DateTimePicker
                value={time}
                mode="time"
                display="spinner"
                onChange={handleChange}
                themeVariant="dark"
                textColor={COLORS.white}
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
    backgroundColor: COLORS.card,
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
    color: COLORS.white,
  },
  chip: {
    backgroundColor: COLORS.purple,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.white,
  },

  /* iOS modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  modalSheet: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: 36,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.cardAlt,
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
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.white,
  },
  modalCancel: {
    fontSize: 15,
    color: COLORS.textMuted,
    fontWeight: "500",
  },
  modalDone: {
    fontSize: 15,
    color: COLORS.purple,
    fontWeight: "700",
  },
  pickerWrapper: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: COLORS.card,
  },
  picker: {
    width: "100%",
    height: 200,
  },
});
