import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../Utils/Colors';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

export default function RecordActionModal(
    { isVisible, record, onClose, onDelete, onStatusChange, isLoading }
) {

    const navigation = useNavigation()
    const [deleteWarning, setDeleteWarning] = useState(false)

    const handleDelete = () => {
        setDeleteWarning(false)
        onDelete(record)
    }
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>

        {/* Header */}
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{record?.illnessName}</Text>
          <TouchableOpacity onPress={onClose}>
            <FontAwesome name="close" size={24} color={"black"} />
          </TouchableOpacity>
        </View>

        <View style={
            {
                width: '100%',
                marginTop: 10,
                borderBlockColor: Colors.GREY, 
                borderWidth: .5
            }
        }></View>

        {/* Footer */}
        <View style={styles.modalFooter}>
          <TouchableOpacity onPress={() => setDeleteWarning(true)} style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          

          {
            record?.illnessStatus === 'ONGOING'?
                <TouchableOpacity onPress={() => onStatusChange(record, 'ENDED')} style={styles.editStatusButtonComplete}>
                    <Text style={styles.buttonText}>Mark as Ended</Text>
                </TouchableOpacity>
            :
                <TouchableOpacity onPress={() => onStatusChange(record, 'ONGOING')} style={styles.editStatusButtonEnded}>
                    <Text style={styles.buttonText}>Mark as Ongoing</Text>
                </TouchableOpacity>

          }


          <TouchableOpacity onPress={() => navigation.push('edit-record', {record})} style={styles.closeButton}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>

      </View>
      {isLoading&&
        <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
        </View>
      }

      {deleteWarning&&
        <View style={styles.deleteOverlay}>
            <Text style={styles.deleteWarningText}>Deleting the record: 
                <Text style={{color: Colors.PRIMARY}}>{` ${record?.illnessName} `}</Text>
                 Will also delete all events associated with this record. Are you sure you want to delete
            </Text>
            <View style={styles.deleteModalAction}>
                <TouchableOpacity style={styles.refuseBtn} onPress={() => setDeleteWarning(false)}>
                    <Text style={styles.deleteWarningBtnText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptBtn} onPress={() => handleDelete()}>
                    <Text style={styles.deleteWarningBtnText}>Yes</Text>
                </TouchableOpacity>
            </View>
        </View>
      }
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  editStatusButtonEnded: {
    backgroundColor: Colors.SECONDARY,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  editStatusButtonComplete: {
    backgroundColor: Colors.SUCCESS,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  closeButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },

  loadingOverlay: {
    top: -120,
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  deleteOverlay: {
    top: -120,
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    padding: 15,
    borderRadius: 10
  }, 

  deleteWarningText: {
    fontFamily: 'outfit',
    lineHeight: 20,
    fontSize: 17,
    textAlign: 'center'
  },

  deleteModalAction: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    gap: 100
  },

  deleteWarningBtnText: {
    color: Colors.WHITE
  },

  refuseBtn: {
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10
  },

  acceptBtn: {
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: Colors.WARNING,
    borderRadius: 10
  }

});
